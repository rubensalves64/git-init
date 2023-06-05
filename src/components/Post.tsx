import { format,formatDistanceToNow }  from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FormEvent, useState, ChangeEvent, InvalidEvent   } from 'react';

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface Author{
  name:string
  role: string
  avatarUrl: string
}
interface Content{
  type:string
  content: string
}
//postprops corresponde as propriedades do meu post
export interface PostProps{
 
  author : Author
  publishedAt: Date
  //aqui abaixo diz que é um arrys com varios objetos dentro dele
  content: Content[]
}



export function Post({author,content, publishedAt}:PostProps){  

  const [comments, setComments] = useState([
    'Post muito bacana, hein?!',
  ])
  const [newCommentText, setNewCommentText] = useState('')
  
  
  
   //aqui abaixo vai formatar o horario para de acordo com biblioetca date-fns
    const publishedDateFormatted = format(publishedAt,"d 'de' LLLL 'ás' HH:mm'h'", {
      locale: ptBR ,
    })
    //data de publicaçao do post relativo ao agora comparando
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
      locale:ptBR,
      //o add suffix vai colocou o há antes da data
      addSuffix:true
    })
  //Dica ao fazer uma funçao com submit de usario ou clique no botao
  // colocar a palavara handle para ficar mais facil de lembrar
    function handleCreateNewComment(event:FormEvent){
      //o  react nao sabe o quue é o event, sem definilo
  event.preventDefault()
  
   //aqui abaixo vai mostrar os novos comentarios ao clicar no sbmeter os botoes
  setComments([...comments, newCommentText])
  //isso abaixo vai servrir para quando for enviado o campo da text area ficar vazio
setNewCommentText('')
    }

//aqui abaixo informa que o evento de change aconteceu em um HTMLTextAreaElement
    function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>){
      //aqui fala que apos fazer um novo comentario e nao der erro elçe volta para
      //um valor vazio
       event.target.setCustomValidity('')
      setNewCommentText(event.target.value)


    }

//Para informar que vai invalidar o evento
    function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>){
   event.target.setCustomValidity('Esse campo é obrigatório!')

      

    }
  
    function deleteComment(commentToDelete: string) {
//uma lista de comentario sem o que eu deletei

      const commentsWithoutDeletedOne = comments.filter(comment => {
        //auqi nessa funçao vamos deleta o comentario que vai procurar no filter 
        
       return comment !== commentToDelete

      })
      
      setComments(commentsWithoutDeletedOne )
      //imutabilidade -> As variaveis nao sofrem mutacao,
      // nos criamos um novo valor um novo espaço na memoria)
     
 
    }
  
    const isNewCommentEmpty= newCommentText.length === 0

    return (
      <article className={styles.post}>
        <header>


          <div className={styles.author}>
            <Avatar src={author.avatarUrl} />
            <div className={styles.authorInfo}>
              <strong>{author.name}</strong>
              <span>{author.role}</span>


            </div>
          </div>


          <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
          </time>
        </header>


        <div className={styles.content}>
        
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
    } else if (line.type === 'link'){
      return <p key={line.content}> <a href="#">{line.content}</a></p>
    }
  })}


        </div>

        
        <form onSubmit={handleCreateNewComment}
         className={styles.commentForm}>
          <strong>Deixe seu feedback</strong>
          <textarea
            name="comment"
            placeholder="Deixe um comentário" 
            value={newCommentText}
            onChange={handleNewCommentChange}
            // quando vai  adiciona o submit, mas o campo dele é invalido
            onInvalid={handleNewCommentInvalid}
            required
          />


          <footer>
           
            <button type="submit" disabled={isNewCommentEmpty}
            //aqui nessa funçao acima do disabled ele declarar que se o texto de letras 
            //for igual a zero sera desabiliatado essa funçao, com avariavel
            //descrita acima
         
             >  Publicar
              </button>
          </footer>
        </form>


        <div className={styles.commentList}>
        {  comments.map (comment => {  
          //aqui embaixo estamos passando funçoes deleteComment, para comunicar um componente
          //com outro dentro do react 
           return (<Comment 
                    key={comment}
                    content = {comment}
                    onDeleteComment={deleteComment} 
                      />
                      )
          } )}
        </div>
      </article>
    );

}