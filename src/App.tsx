import { Header } from './components/Header'
import './global.css'

import {Post } from './components/Post'
import styles from './App.module.css'


import { Sidebar } from './components/Sidebar'



//aqui emmabixo ate agora sao todas informaçoes que serao passadas ao backend
//para nao deixar em forma de html para deixar o site mais seguro

//aqui declara que o formato desse arrrays tem que ser postype com conchetes no final para ddizer que eum arrys
const posts  = [
  {
    id:1,
    author:{
      avatarUrl:'https://github.com/rubensalves64.png',
      name: 'Rubens Alves',
      role:'Ceo da Xiaomi'
    },
    content:[
      {type:'paragraph', content:'Fala galeraa 👋'},
      {type:'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type:'link', content:'jane.design/doctorcare'},
 ],
 publishedAt: new Date('22-05-03 20:00:00'),
  }, 
  {
    id:2,
    author:{
      avatarUrl:'https://github.com/rubensalves64.png',
      name: 'Romulo',
      role:'Ceo @Rocketseat'
    },
    content:[
      {type:'paragraph', content:'Fala galeraa 👋'},
      {type:'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type:'link', content:'jane.design/doctorcare'},
 ],
 publishedAt: new Date('22-05-28 20:00:00'),
  }, 
]

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App