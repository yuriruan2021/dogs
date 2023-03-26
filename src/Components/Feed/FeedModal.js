import React from 'react'
import { useEffect } from 'react';
import { PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import styles from './FeedModal.module.css'


const FeedModal = ({photo, setModalPhoto }) => {

  const {data, request, loading, error} = useFetch();

  //Função para remover o modal
  function handleOutsideClick(event){
    if(event.target === event.currentTarget){
      setModalPhoto(null)
    }
  }

  useEffect(() => {
    const {url, options} = PHOTO_GET(photo.id)
    request(url, options)
  }, [photo, request])

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
      
    </div>
  )
}

export default FeedModal