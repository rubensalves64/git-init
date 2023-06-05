import {ImgHTMLAttributes} from "react";

import styles from './Avatar.module.css'


interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
  //o interrogacao antes descreve que o hasborder nao é obrigatorio
  hasBorder?: boolean
  
}


//aqui diz que caso a propriedade hasborder for va
export function Avatar({ hasBorder = true, ...props }:AvatarProps) {
    return (
      <img
        className={hasBorder ? styles.avatarWithBorder : styles.avatar}
        //o props vai pegar todas as propriedades a seguir epgando ccada cvalor e passando como propriedade
    {...props}

      />
    );
  }
  
  
  
  
  
  