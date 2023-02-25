# Laporan Proyek Machine Learning - Aldi Akbar Alimi

## Project Overview

Perkembangan dunia film di seluruh dunia, termasuk Indonesia sangat cepat. Mulai dari penggunaan CGI yang sangat realistis, genre ataupun alur cerita film yang sangat beragam, serta akting dari para pemeran yang membuat penonton semakin menikmati film yang ditonton. Namun semakin berkembangnya teknologi saat ini, untuk bisa menikmati film tidak harus dilakukan di dalam bioskop atau harus pergi ke bioskop terdekat. Penonton bisa menonton film melalui website atau aplikasi seperti Disney Hotstar, Netflix, Amazon Prime Video, dan masih banyak lagi. Dengan semakin banyaknya opsi tempat untuk bisa menonton film, maka website atau aplikasi tersebut membutuhkan sesuatu hal untuk bisa membuat penonton nyaman dan tidak berpindah ke website atau aplikasi lain. Salah satu caranya yaitu dengan memberikan rekomendasi film yang sesuai dengan selera dari user. Maka dari itu, dibutuhkan sistem rekomendasi agar bisa memberikan user rekomendasi film yang menarik bagi pengguna.

Tujuan dari dibuatnya sistem rekomendasi film ini bisa dirasakan oleh kedua sisi, yaitu sisi pengguna dan sisi platform penyedia streaming film. Dari sisi pengguna, sistem rekomendasi ini bisa memudahkan pengguna untuk menonton film yang sesuai dengan genre yang disukai. Selain itu juga sistem rekomendasi ini dapat menambah referensi film lain yang belum ditonton oleh pengguna dan mungkin saja film itu sedang dicari untuk ditonton oleh pengguna. Sedangkan dari sisi platform streaming film, sistem rekomendasi ini bisa meningkatkan user experience. Akibatnya, user menjadi semakin nyaman dalam menonton film di platform tersebut dan tidak berpindah ke platform lain.

## Business Understanding

### Problem Statements
- Bagaimana cara memberikan rekomendasi film kepada pengguna sesuai dengan genre yang disukai pleh pengguna?
- Bagaimana cara memberikan rekomendasi film kepada pengguna yang baru masuk ke dalam platform streaming film tersebut?
- Dari kedua model yang akan dibuat, model mana yang akan bisa memberikan rekomendasi film yang lebih baik ke pengguna?

### Goals
- Membuat model sistem rekomendasi film yang bisa memberikan rekomendasi film sesuai dengan genre yang disukai oleh pengguna
- Membuat model sistem rekomendasi film yang bisa memberikan rekomendasi film kepada pengguna yang baru masuk ke platforn streaming film
- Mencari model sistem rekomendasi mana yang lebih baik untuk digunakan dalam memberikan rekomendasi kepada pengguna

### Solution statements
Sistem rekomendasi film yang akan dibuat menggunakan dua algoritma yang berbeda. Algoritma yang akan digunakan yaitu *Content Based FIltering* dan *Collaborative Filtering*. *Content Based FIltering* akan merekomendasikan film yang mirip dengan film yang disukai pengguna di masa lalu. Sedangkan *Collaborative Filtering* akan merekomendasikan film berdasarkan kepada pendapat komunitas pengguna.

## Data Understanding
Dataset yang saya gunakan merupakan dataset yang berasal dari platform Kaggle dengan judul dataset yaitu [Movie Recommender System Dataset](https://www.kaggle.com/datasets/gargmanas/movierecommenderdataset). Dataset ini dibagi menjadi dua file, yaitu file movies.csv dan ratings.csv. Data yang terdapat pada dataset ini berisi kumpulan film dengan jumlah judul film sebesar 9742 film, user yang memberikan rating yaitu 610 orang, dan total rating yang ada pada dataset sebesar 100836. Variabel-variabel pada [Movie Recommender System Dataset](https://www.kaggle.com/datasets/gargmanas/movierecommenderdataset) adalah sebagai berikut:
- movieId : id dari Movies.
- title : nama dari Movies.
- genres : genre dari Movies yang dipisahkan oleh vertical bar( | ).
- userId : id dari user
- rating : rating yang diberikan user kepada film.
- timestamp : tanggal saat user memberikan rating tersebut

### Exploartory Data Analysis
Pada proses EDA ini, kita akan mengecek apakah terdapat nilai null dan duplikasi pada file movies.csv dan ratings.csv. Kode yang dijalankan yaitu sebagai berikut. 
```
movies.isnull().sum()
ratings.isnull().sum()

duplicate_rows_movies = movies[movies.duplicated()]
print("number of duplicate rows: ", duplicate_rows_movies.shape)

duplicate_rows_ratings = ratings[ratings.duplicated()]
print("number of duplicate rows: ", duplicate_rows_ratings.shape)
```
Dengan menjalankan kode diatas, didapatkan informasi bahwa tidak ditemukan nilai null atau duplikat pada kedua file. 

Selanjutnya, akan dilakukan proses visualisasi pada genre film menggunakan library dari wordCloud. Kode beserta output yang dihasilkan yaitu sebagai berikut.
```
genres = movies.genres
stopwords = set(STOPWORDS)
comment_words = ''
for genre in genres:
 
    genre = str(genre)
    # split the different genres
    tokens = genre.split()
     
    # Converts each token into lowercase
    for i in range(len(tokens)):
        tokens[i] = tokens[i].lower()
     
    comment_words += " ".join(tokens)+" "
wordcloud = WordCloud(width = 2000, height = 1000, background_color ='black', stopwords = stopwords, min_font_size = 10).generate(comment_words)
    
#Plot the wordcloud
plt.figure(figsize = (13, 10), facecolor = None)
plt.imshow(wordcloud)
plt.title("All Genre")
plt.axis("off")
plt.tight_layout(pad = 0)
plt.show()
```
![gambar genre](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/8.png?raw=true)
Berdasarkan output diatas, didapatkan informasi bahwa:
- tidak terdapat nilai null ataupun duplikat pada dataset movies
- genre yang paling banyak muncul pada dataset movies diantaranya yaitu comedy, romance, drama, sci-fi

Selanjutnya kita juga akan lakukan visualisasi pada ratings untuk melihat frekuensi rating yang sering diberikan oleh user kepada film. Kode dan outputnya yaitu sebagai berikut.
```
sns.countplot(ratings.rating)
```
![gambar ratings](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/10.png?raw=true)

Berdasarkan output diatas, didapatkan informasi bahwa:
- rating terbanyak yang diberikan oleh user yaitu 4,0 dan disusul oleh rating 3,0. 
- rating tersedikit yang diberikan oleh user yaitu 0,5.

## Data Preparation
Pada tahap Data Preparation, data akan disiapkan terlebih dahulusebelum melakukan modelling.Adapun persiapan yang dilakukan yaitu:
- *merge* dataset movies dengan dataset ratings, 
- pengecekan missing value pada dataframe hasil *merge* 
- mengurutkan dataframe sesuai dengan id dari movie
- Cek dan Membuang baris yang duplikat.
- Mengonversi data menjadi list.
- membuat dictionary dataframe.
- Membuang stopwords pada dataframe.

Hal yang akan dilakukan pertama yaitu melakukan *merge* atau menggabungkan dataset movies dengan dataset ratings. Proses ini akan menggunakan kolom `movieId` sebagai media penyatuannya. Kode dan outputnya yaitu sebagai berikut. 
```
new_movie = pd.merge(movies, ratings , on='movieId', how='left')
new_movie
```
![gambar new_movie](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/11.png?raw=true)\

Selanjutnya, dilakukan pengecekan missing value pada dataframe hasil *merge* tadi,. 
```
new_movie.isnull().sum()
``` 
![gambar null_new_movie](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/12.png?raw=true)\

Berdasarkan output diatas, terdapat missing value pada dataframe baru yaitu new_movie, selanjutnya akan dihilangkan baris yang memiliki missing value tersebut.
```
new_movie = new_movie.dropna()
new_movie.isnull().sum()
``` 
![gambar notnull_new_movie](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/13.png?raw=true)\

Berdasarkan output diatas, dataframe new_movie telah bebas dari missing value.

Selanjutnya akan diurutkan baris pada dataframe berdasarkan movieId. Kodenya yaitu sebagai berikut.

```
new_movie = new_movie.sort_values('movieId', ascending=True)
new_movie
```
![gambar notnull_new_movie](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/14.png?raw=true)\

Hal selanjutnya yaitu melihat apakah ada duplikasi pada movieId pada *dataframe* baru yang telah di *merge* sebelumnya. Kode dan outputnya yaitu sebagai berikut.
```
duplicate_rows_new_movie = new_movie[new_movie['movieId'].duplicated()]
print("number of duplicate rows: ", duplicate_rows_new_movie.shape)
```

Hasil kode diatas yaitu terdapat nilai duplikasi pada dataframe baru yaitu sebesar 91112 baris. Selanjunya yaitu akan kita hapus nilai duplikat tersebut dan dimasukkan kedalam variabel preparation.

```
preparation = new_movie.drop_duplicates('movieId')
```

Hal selanjutnya yaitu menbuat dataframe movie_new yang berisi movie_id, movie_title dan movie_genre. Dataframe ini akan digunakan untuk menampilkan hasil rekomendasi menggunakan kedua jenis, yaitu content based dan collaborative.

```
movie_id = preparation['movieId'].tolist()
movie_title = preparation['title'].tolist()
movie_genre = preparation['genres'].tolist()

movie_new = pd.DataFrame({
    'Id': movie_id,
    'Title': movie_title,
    'Genre': movie_genre
})
movie_new
```

Hal selanjutnya yaitu menbuat *dataframe* data dan membuat fungsi sanitize yang akan digunakan dalam proses *removing stop word*  atau *text cleaning*.
```
data = movie_new
def sanitize(x):
  try:
    if isinstance(x,list):
      return [i.replace(' ', ',').replace('|', ' ').replace('-','').lower() for i in x]  
    else:
      return [x.replace(' ','').lower()]
  except:
    print(x)

for i in data.Genre:
  data.Genre = data.Genre.apply(sanitize)
 
data.Genre
```

![gambar data Genre](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/bonus.png?raw=true)\

## Modeling
Tahapan selanjutnya yaitu melakukan modelling pada data yang telah disiapkan dan telah melalui proses-proses sebelumnya.Pada kasus ini kita menggunakan 2 model algoritma yaitu Content Based Filtering dan Collaborative Filtering.

### **Model Developing**: Content Based Filtering
Algoritma Content Based Filtering adalah sistem yang merekomendasikan item yang mirip dengan item yang disukai pengguna di masa lalu.  Algoritma ini bekerja dengan menyarankan item serupa yang pernah disukai di masa lalu atau sedang dilihat di masa kini kepada pengguna. Semakin banyak informasi yang diberikan pengguna, semakin baik akurasi sistem rekomendasi. Kelebihan model ini yaitu sistem dapat merekomendasikan secara akurat item/film yang sesuai dengan user setelah user menonton film yang berkaitan dengan semakin banyaknya sample maka tingkat akurasinya akan sangat tinggi. Kelemahan dari sistem ini yaitu terbatasnya rekomendasi hanya terhadap item-item yang mirip sehingga tidak ada kesempatan untuk mendapatkan item yang tidak terduga.

Hal yang akan dilakukan pertama yaitu proses untuk menemukan representasi fitur penting dari setiap genre film menggunakan TF-IDF Vectorizer dari library sklearn. Kodenya yaitu sebagai berikut.

```
from sklearn.feature_extraction.text import TfidfVectorizer
 
# Inisialisasi TfidfVectorizer
tf = TfidfVectorizer()
 
# Melakukan perhitungan idf pada data genre
tf.fit(data['Genre'].astype(str)) 
 
# Mapping array dari fitur index integer ke fitur nama
tf.get_feature_names()
```
**Output:**
['action', 'adventure', 'animation', 'children', 'comedy', 'crime', 'documentary', 'drama', 'fantasy', 'filmnoir', 'horror', 'imax', 'musical', 'mystery', 'nogenreslisted', 'romance', 'scifi', 'thriller', 'war', 'western']

Berdasarkan output diatas, didapat 20 genre yang ada pada dataset yaitu seperti pada output diatas. Selanjutnya, dilakukan proses fit dan transformasi hasil sebelumnya ke dalam bentuk vektor. Kodenya yaitu sebagai berikut.

```
tfidf_matrix = tf.fit_transform(data['Genre'].astype(str)) 
tfidf_matrix.shape 
```
Shape dari vektor tf-idf diatas yaitu (9724, 20) atau 9724 baris dan 20 kolom.

Selanjutnya, lakukan proses todense untuk mengubah vektor tf-idf dalam bentuk matriks. Kodenya yaitu sebagai berikut.

```
# Mengubah vektor tf-idf dalam bentuk matriks dengan fungsi todense()
tfidf_matrix.todense()
```

![gambar tfidf](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/16.png?raw=true)\

Selanjutnya, buat dataframe baru untuk melihat hasil matriks tf-idf terhadap judul film dan beberapa genrenya.  Kodenya yaitu sebagai berikut.

```
pd.DataFrame(
    tfidf_matrix.todense(), 
    columns=tf.get_feature_names(),
    index=data.Title
).sample(20, axis=1).sample(5, axis=0)
```

![gambar df tfidf](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/17.png?raw=true)\

Berdasarkan output diatas, didapatkan informasi bahwa film **Feds (1988)** merupakan film dengan genre comedy, dibuktikan dengan nilai tf-idf yaitu 1. Terdapat pula film **Dear John (2010)** merupakan film dengan genre war, romance dan drama.

Langkah selanjutnya yaitu menghitung derajat kesamaan (*similarity degree*) antar film dengan teknik *cosine similarity* dari library sklearn. Kodenya yaitu sebagai berikut. 

```
from sklearn.metrics.pairwise import cosine_similarity
 
# Menghitung cosine similarity pada matrix tf-idf
cosine_sim = cosine_similarity(tfidf_matrix) 
cosine_sim
```

![gambar cosine sim](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/18.png?raw=true)\

Selanjutnya, buat dataframe untuk melihat matriks kesamaan setiap film. Kodenya yaitu sebagai berikut.

```
# Membuat dataframe dari variabel cosine_sim dengan baris dan kolom berupa judul film
cosine_sim_df = pd.DataFrame(cosine_sim, index=data['Title'], columns=data['Title'])
print('Shape:', cosine_sim_df.shape)
 
# Melihat similarity matrix pada setiap film
cosine_sim_df.sample(5, axis=1).sample(10, axis=0)
```

![gambar cosine sim df](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/19.png?raw=true)\

Berdasarkan informasi diatas, terdapat film yang memiliki nilai cosine similarity paling tinggi, yaitu film **Out Cold (2001)** dan film **Berlin Calling (2000)** dengan nilai cosine similarity sekitar 0.7. 

Selanjutnya, definikasn fungsi movie_recommendation untuk mendapatkan rekomendasi film berdasarkan user yang telah memberikan rating film sebelumnya. Ambil contoh si A telah memberikan rating yang bagus untuk film **Men In Black**, maka A akan mendapatkan rekomendasi film yang mirip dengan film **Men In Black** berdasarkan kesamaan yang dihitung dengan cosine similarity pada tahap sebelumnya. Kodenya yaitu sebagai berikut.

```
def movie_recommendations(judul_film, similarity_data=cosine_sim_df, items=data[['Title', 'Genre']], k=7):
    # Mengambil data dengan menggunakan argpartition untuk melakukan partisi secara tidak langsung sepanjang sumbu yang diberikan    
    # Dataframe diubah menjadi numpy
    # Range(start, stop, step)
    index = similarity_data.loc[:,judul_film].to_numpy().argpartition(
        range(-1, -k, -1))
    
    # Mengambil data dengan similarity terbesar dari index yang ada
    closest = similarity_data.columns[index[-1:-(k+2):-1]]
    
    # Drop judul film agar judul film yang dicari tidak muncul dalam daftar rekomendasi
    closest = closest.drop(judul_film, errors='ignore')
 
    return pd.DataFrame(closest).merge(items).head(k)
```
Keterangan parameter pada fungsi diatas:
- judul_film : tipe data string (str) judul film (index kemiripan dataframe)
- similarity_data : tipe data pd.DataFrame (object) Kesamaan dataframe, simetrik, dengan film sebagai indeks dan kolom
- items : tipe data pd.DataFrame (object) Mengandung kedua nama dan fitur lainnya yang digunakan untuk mendefinisikan kemiripan
- k : tipe data integer (int)Banyaknya jumlah rekomendasi yang diberikan. Pada index ini, kita mengambil k dengan nilai similarity terbesar pada index matrix yang diberikan (i).

Selanjutnya, terapkan kode untuk menemukan rekomendasi film yang mirip dengan film **Frequency (2000)**. 

```
data[data.Title.eq('Frequency (2000)')]
```

![gambar cosine sim df](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/20.png?raw=true)\

Berdasarkan output diatas, didapatkan informasi bahwa Film **Frequency (2000)** ternyata merupakan film dengan genre drama dan thriller.

Terakhir, kita jalankan fungsi movie_recommendations untuk mendapatkan rekomendasi film **Frequency (2000)**.

```
movie_recommendations('Frequency (2000)')
```

![gambar cosine sim df](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/21.png?raw=true)\

Seperti yang dilihat pada output diatas, sistem berhasil memberikan rekomendasi film yang mirip dengan film **Frequency (2000)** menggunakan algoritma *content based filtering*. Mari lanjutkan ke algoritma selanjutnya yaitu *collaborative filtering*.

### **Model Developing**: *Collaborative Filtering*

Algoritma *Collaborative Filtering* adalah Algoritma yang bergantung pada pendapat komunitas pengguna. Ia tidak memerlukan atribut untuk setiap itemnya seperti pada algoritma sebelumnya. *Collaborative filtering* dibagi lagi menjadi dua kategori, yaitu: *model based* (metode berbasis model ML) dan *memory based* (metode berbasis memori). Kelebihan algoritma ini yaitu rekomendasi tetap akan berkerja dalam keadaan dimana konten sulit dianalisi sekalipun sedangkan kekurangannya yaitu membutuhkan parameter rating, sehingga jika ada item baru sistem tidak akan merekomendasikan item tersebut.

Hal yang akan dilakukan pertama kali untuk menerapkan algoritma ini yaitu mendefinisikan variabel df yang mengambil dari dataset ratings.csv yang telah melewati proses EDA.

```
df = ratings
```

Langkah selanjutnya yaitu cek beberapa hal dalam data seperti jumlah user, jumlah film, mengubah nilai rating menjadi float32 .

```
# Mendapatkan jumlah user
num_users = len(df.userId.unique())
print(num_users)
 
# Mendapatkan jumlah movie
num_movie = len(df.movieId.unique())
print(num_movie)
 
# Mengubah rating menjadi nilai float
df['rating'] = df['rating'].values.astype(np.float32)
 
# Nilai minimum rating
min_rating = min(df['rating'])
 
# Nilai maksimal rating
max_rating = max(df['rating'])
 
print('Number of User: {}, Number of movie: {}, Min Rating: {}, Max Rating: {}'.format(
    num_users, num_movie, min_rating, max_rating
))
```
**Output:**
610
9724
Number of User: 610, Number of movie: 9724, Min Rating: 0.5, Max Rating: 5.0

Langkah berikutnya yaitu acak dataset terlebih dahulu agar distribusinya menjadi random dan lakukan split dataset menjadi data training dan data testing.

```
df = df.sample(frac=1, random_state=42)

# Membuat variabel x untuk mencocokkan data user dan movie menjadi satu value
x = df[['userId', 'movieId']].values
 
# Membuat variabel y untuk membuat rating dari hasil 
y = df['rating'].apply(lambda x: (x - min_rating) / (max_rating - min_rating)).values
 
# Membagi menjadi 80% data train dan 20% data validasi
train_indices = int(0.8 * df.shape[0])
x_train, x_val, y_train, y_val = (
    x[:train_indices],
    x[train_indices:],
    y[:train_indices],
    y[train_indices:]
)
print(x, y)
```

![gambar data split](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/22.png?raw=true)\

Selanjutnya, buat class RecommenderNet dengan keras Model class. Kode class RecommenderNet ini terinspirasi dari tutorial dalam situs Keras dengan beberapa adaptasi sesuai kasus yang sedang kita selesaikan. Terapkan kode berikut.

```
class RecommenderNet(tf.keras.Model):
 
  # Insialisasi fungsi
  def __init__(self, num_users, num_movie, embedding_size, **kwargs):
    super(RecommenderNet, self).__init__(**kwargs)
    self.num_users = num_users
    self.num_movie = num_movie
    self.embedding_size = embedding_size
    self.user_embedding = layers.Embedding( # layer embedding user
        num_users,
        embedding_size,
        embeddings_initializer = 'he_normal',
        embeddings_regularizer = keras.regularizers.l2(1e-6)
    )
    self.user_bias = layers.Embedding(num_users, 1) # layer embedding user bias
    self.movie_embedding = layers.Embedding( # layer embeddings movie
        num_movie,
        embedding_size,
        embeddings_initializer = 'he_normal',
        embeddings_regularizer = keras.regularizers.l2(1e-6)
    )
    self.movie_bias = layers.Embedding(num_movie, 1) # layer embedding movie bias
 
  def call(self, inputs):
    user_vector = self.user_embedding(inputs[:,0]) # memanggil layer embedding 1
    user_bias = self.user_bias(inputs[:, 0]) # memanggil layer embedding 2
    movie_vector = self.movie_embedding(inputs[:, 1]) # memanggil layer embedding 3
    movie_bias = self.movie_bias(inputs[:, 1]) # memanggil layer embedding 4
 
    dot_user_movie = tf.tensordot(user_vector, movie_vector, 2) 
 
    x = dot_user_movie + user_bias + movie_bias
    
    return tf.nn.sigmoid(x) # activation sigmoid
```

Selanjutnya, lakukan proses compile terhadap model menggunakan Binary Crossentropy untuk menghitung loss function, Adam (Adaptive Moment Estimation) sebagai optimizer, dan root mean squared error (RMSE) sebagai metrics evaluation.

```
model = RecommenderNet(num_users, num_movie, 50) # inisialisasi model
 
# model compile
model.compile(
    loss = tf.keras.losses.BinaryCrossentropy(),
    optimizer = keras.optimizers.Adam(learning_rate=0.001),
    metrics=[tf.keras.metrics.RootMeanSquaredError()]
)
```

Langkah selanjutnya, mulailah proses training. 

```
history = model.fit(
    x = x_train,
    y = y_train,
    batch_size = 512,
    epochs = 50,
    validation_data = (x_val, y_val)
)
```

![gambar model training](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/23.png?raw=true)\

Selanjutnya yaitu ambil sampel user secara acak dan definisikan variabel movie_not_view yang merupakan daftar film yang belum pernah dilihat oleh user. Kodenya yaitu sebagai berikut.

```
movie_df = movie_new
df = pd.read_csv('ratings.csv')
 
# Mengambil sample user
user_id = df['userId'].sample(1).iloc[0]
movie_view_by_user = df[df['userId'] == user_id]
 
movie_not_view = movie_df[~movie_df['Id'].isin(movie_view_by_user.movieId.values)]['Id'] 
movie_not_view = list(
    set(movie_not_view)
    .intersection(set(df.movieId.keys()))
)
 
movie_not_view = [[df.movieId.get(x)] for x in movie_not_view]
user_encoder = df.get(user_id)
user_movie_array = np.hstack(
    ([[user_encoder]] * len(movie_not_view), movie_not_view)
)
user_movie_array = np.asarray(user_movie_array).astype(np.float32)
```

Selanjutnya, untuk memperoleh rekomendasi film, gunakan fungsi model.predict() dari library Keras dengan menerapkan kode berikut.

```
ratings = model.predict(user_movie_array).flatten()
 
top_ratings_indices = ratings.argsort()[-10:][::-1]
recommended_movie_ids = [
    df.movieId.get(movie_not_view[x][0]) for x in top_ratings_indices
]
 
print('Showing recommendations for users: {}'.format(user_id))
print('===' * 9)
print('movie with high ratings from user')
print('----' * 8)
 
top_movie_user = (
    movie_view_by_user.sort_values(
        by = 'rating',
        ascending=False
    )
    .head(5)
    .movieId.values
)
 
movie_df_rows = movie_df[movie_df['Id'].isin(top_movie_user)]
for row in movie_df_rows.itertuples():
    print(row.Title, ':', row.Genre)
 
print('----' * 8)
print('Top 10 movie recommendation')
print('----' * 8)
 
recommended_movie = movie_df[movie_df['Id'].isin(recommended_movie_ids)]
for row in recommended_movie.itertuples():
    print(row.Title, ':', row.Genre)
```

![gambar model training](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/25.png?raw=true)\

Berdasarkan output diatas, model yang dihasilkan bisa memberikan rekomendasi film dengan cukup bagus. Hal ini bisa dibuktikan dengan film yang diberikan oleh sistem cukup sesuai dengan genre film yang diberikan rating tinggi oleh user.

## Evaluation
Pada tahap Evaluation ini model akan di evaluasi dengan metrik yang telah ditentukan. Proses evaluasi pada kedua algoritma menggunakan metrik yang berbeda. Pada evaluasi dengan algoritma **Content Based Filtering** akan digunakan metrik *Cosine Similarity*, sedangkan pada algoritma *Collaborative FIltering* akan menggunakan metrik RMSE (*Root Mean Squared Error*).

### Evaluation: **Content Based Filtering** 
Metrik Evaluasi yang digunakan pada algoritma ini yaitu metrik *Cosine Similarity*. *Cosine Similarity* mengukur kesamaan antara dua vektor dan menentukan apakah kedua vektor tersebut menunjuk ke arah yang sama. Cosine similarity pada Python menghitung kesamaan sebagai dot product yang dinormalisasi dari masukan sampel X dan Y. Kita akan menggunakan sklearn cosine_similarity untuk mendapatkan nilai cosinus dua vektor dalam matriks.

Berikut ini merupakan rumus dari *Cosine Similarity*
![Cosine](https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:784efd3d2ba47d47153b050526150ba920210910171725.jpeg).

Pada tahap ini *Cosine Similarity* membandingkan keterkaitan antara film A dan dengan film B dengan ketentuan sebagai berikut. 
- Semakin besar jarak, kesamaan semakin kecil (menuju nol)
- Semakin kecil jarak, kesamaan semakin besar (menuju satu)

Adapun hasil evaluasinya yaitu sebagai berikut.

![gambar cosine](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/19.png?raw=true)\

Berdasarkan informasi diatas, terdapat film yang memiliki nilai cosine similarity paling tinggi, yaitu film **Out Cold (2001)** dan film **Berlin Calling (2000)** dengan nilai cosine similarity sekitar 0.7. 


### Evaluation: **Collaborative Filtering** 
Metrik Evaluasi yang digunakan yaitu RMSE (*Root Mean Squared Error*). RMSE merupakan ukuran yang sering digunakan dari perbedaan antara nilai yang diprediksi oleh model atau estimator dan nilai yang diamati. Metrik ini bekerja dengan cara menghitung dengan mengkuadratkan error (prediksi**observasi) dibagi dengan jumlah data lalu diakarkan.
**Rumus RMSE:**
![rmse](https://1.bp.blogspot.com/-AodtifmdR1U/X-NOXo0avGI/AAAAAAAACmI/_jvy7eLB72UB00dW_buPYZCa9ST2yx8XACNcBGAsYHQ/w1200-h630-p-k-no-nu/rumus%2Brmse.jpg)

Berikut penjelasan mengenai RMSE.
At : Nilai data aktual 
Ft : Nilai hasil peramalan
N  : Banyaknya data
∑  : Summation(jumlah keseluruhan Nilai)

Adapun hasil evaluasinya yaitu sebagai berikut.

```
plt.plot(history.history['root_mean_squared_error'])
plt.plot(history.history['val_root_mean_squared_error'])
plt.title('model_metrics')
plt.ylabel('root_mean_squared_error')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
plt.show()
```

![gambar model training](https://github.com/AldiAkbar/laporan-mlt-dicoding/blob/mymaster/Submission2/asset/24.png?raw=true)\

Pada model yang telah dilatih dengan menggunakan RecommenderNet dari keras RMSE yang terakhir dihasilkan yaitu 0.19 dan error pada data validasi sekitar 0.23. Artinya model tersebut sangat baik untuk merekomendasikan film berdasarkan rating pengguna sebelumnya.

## Kesimpulan
Untuk menjawab pertanyaan pada problem statement, dapat disimpulkan sebagai berikut.
1. Model ML dengan algoritma *Content Based Filtering* bisa memberikan rekomendasi film kepada pengguna sesuai dengan genre yang disukai oleh pengguna
2. Model ML dengan algoritma *Collaborative Filtering* bisa memberikan rekomendasi film kepada pengguna yang baru masuk atau baru bergabung ke dalam platform streaming film tersebut
3. Dari kedua model yang telah dibuat, menurut saya model ML dengan algoritma *Content Based Filtering* mampu memberikan rekomendasi film yang lebih baik. Karena, film yang direkomendasikan sangat sesuai dengan genre yang disukai oleh pengguna.


**---Ini adalah bagian akhir laporan---**

_Catatan:_
- _Anda dapat menambahkan gambar, kode, atau tabel ke dalam laporan jika diperlukan. Temukan caranya pada contoh dokumen markdown di situs editor [Dillinger](https://dillinger.io/), [Github Guides: Mastering markdown](https://guides.github.com/features/mastering-markdown/), atau sumber lain di internet. Semangat!_
- Jika terdapat penjelasan yang harus menyertakan code snippet, tuliskan dengan sewajarnya. Tidak perlu menuliskan keseluruhan kode project, cukup bagian yang ingin dijelaskan saja.
