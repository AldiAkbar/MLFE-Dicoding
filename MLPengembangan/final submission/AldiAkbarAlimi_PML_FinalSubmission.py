#!/usr/bin/env python
# coding: utf-8

# In[31]:


import os
import random
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import pathlib

from tensorflow import keras
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Input

import warnings
warnings.filterwarnings('ignore')


# In[32]:


train = "./dataset/train"
labels = pd.read_csv('./dataset/train.csv')


# In[33]:


print(labels['label'].value_counts())


# In[34]:


validation_split = 0.8
indexes = np.random.permutation(range(len(labels))) < validation_split*len(labels)

train_labels = labels[indexes]
validation_labels = labels[~indexes]
print(len(train_labels))
print(len(validation_labels))


# In[35]:


validation_labels


# In[36]:


class Callback(tf.keras.callbacks.Callback): 
    def on_epoch_end(self, epoch, logs={}): 
        if(logs.get('accuracy')>0.85 and logs.get('val_accuracy')>0.85):
            print("\n Nilai akurasi pada data training dan data validation lebih dari 85%") 
            self.model.stop_training = True 
 
callbacks = Callback()


# In[37]:


train_datagen = ImageDataGenerator(
    rescale=1.0/255,
    rotation_range=5,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    vertical_flip=True,
    fill_mode='nearest'
)

train_generator = train_datagen.flow_from_dataframe(dataframe=train_labels, 
                                                    directory=train,
                                                    x_col='image_ID',
                                                    y_col='label',
                                                    target_size=(150,150),
                                                    batch_size=64,
                                                    class_mode="categorical", 
                                                    validation_split = 0.2)


# In[38]:


validation_datagen = ImageDataGenerator(
    rescale=1.0/255
)

validation_generator = validation_datagen.flow_from_dataframe(dataframe=validation_labels, 
                                                              directory=train,
                                                              x_col='image_ID',
                                                              y_col='label',
                                                              target_size=(150,150),
                                                              batch_size=64,
                                                              class_mode="categorical",
                                                              validation_split = 0.2)


# In[39]:


pre_trained_model = MobileNetV2(weights="imagenet", include_top=False,
                                input_tensor=Input(shape=(150, 150, 3)))
 
for layer in pre_trained_model.layers[:-10]:
    layer.trainable = False
 
last_output = pre_trained_model.output

x = tf.keras.layers.Flatten(name="flatten")(last_output)
x = tf.keras.layers.Dropout(0.2)(x)
x = tf.keras.layers.Dense(128, activation="relu")(x)
x = tf.keras.layers.Dense(128, activation="relu")(x)
x = tf.keras.layers.Dense(7, activation='softmax')(x)

model = tf.keras.models.Model(pre_trained_model.input, x)

model.summary()


# In[40]:


optimizer = tf.optimizers.Adam(lr=1e-04)
model.compile(optimizer=optimizer,
              loss='categorical_crossentropy',
              metrics = ['accuracy'])

history = model.fit(train_generator,
                    validation_data=validation_generator,
                    epochs=20,
                    verbose=2,
                    callbacks=[callbacks])


# In[41]:


acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

plt.figure(figsize=(8, 8))
plt.subplot(1, 2, 1)
plt.plot(acc, label='Training Accuracy')
plt.plot(val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(loss, label='Training Loss')
plt.plot(val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()


# In[42]:


# Menyimpan model dalam format SavedModel
export_dir = 'saved_model/'
tf.saved_model.save(model, export_dir)
 
# Convert SavedModel menjadi vegs.tflite
converter = tf.lite.TFLiteConverter.from_saved_model(export_dir)
tflite_model = converter.convert()
 
tflite_model_file = pathlib.Path('sports.tflite')
tflite_model_file.write_bytes(tflite_model)

