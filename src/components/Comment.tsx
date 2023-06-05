import { useState } from 'react';
import styles from './Comment.module.css'

import { Avatar } from './Avatar';
import { ThumbsUp, Trash } from '@phosphor-icons/react';

interface CommentProps{
    content: string
    // isso abaixo diz que é um funçao mais nao vai retornar nada por isso o void
    //mas tambem precsio explicar que ele a receber um parametro que e uma string
    //o nome comment podia ser qualquer um 
    onDeleteComment:(comment: string)=>void
}

export function Comment({content, onDeleteComment}: CommentProps) {
const [likeCount, setLikeCount] = useState(0)

function handleDeleteComment() {
   
//aqui abaixo vai chama a funçao, passando como parametro o conteudo do meu comentario
onDeleteComment(content)
}

function handleLikeComment(){
    //aqui nessa funçao tem como prioridade pegar o numero anteriro e adicoonar mais 1
    //e ser cahamada no span abaixo
    setLikeCount((state)=>{
        return state + 1
    })
}
    
    return ( 
        
        <div className={styles.comment}>
        <Avatar
         hasBorder={false}
          src="https://github.com/rubensalves64.png" 
          alt=""
           />
  
        <div className={styles.commentBox}>
          <div className={styles.commentContent}>
            <header>
                <div className={styles.authorAndTime}>
                    <strong>Rubens Alves</strong>
                    <time title='24 de Maio ás 10:13h' dateTime="2023-05-11 10:00:00">Cerca de 1h atrás</time>
                </div>
                <button onClick={handleDeleteComment} title="excluir comentario">
                    <Trash size={24}/>
                </button>
            </header>
            <p>{content}</p>
        </div>


        
        <footer>
         <button onClick={handleLikeComment}>
            <ThumbsUp/> 
            Aplaudir <span>{likeCount}</span>
         </button>
        </footer>
        </div>


        </div>
        
        
        
  
     );
}

