import { app } from '../config/firebase'
import { useGetImgName } from '../hooks/useGetImgName'
import { useState, useEffect } from 'react'
import { ref, getStorage, getDownloadURL} from 'firebase/storage'
import PhotoItem from '../components/PhotoItem'


function PhotoGallery() {

    const { imagesName, loading } = useGetImgName()
    const [photoUrls, setPhotoUrls] = useState(null)
   

    useEffect(() => {
        const imgUrls = async () => {
            return await Promise.all(
                imagesName.map((image) => storeImage(image))
            ).catch((error) => {console.log(error)})
    
        }
        
        imgUrls()
            .then((url) => setPhotoUrls(url))

    }, [imagesName])



    
    const storeImage = (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage()
            const storageRef = ref(storage, 'images/' + image)

            getDownloadURL(storageRef)
                .then((url) => resolve(url))
                .catch((error) => reject(error))
        })
    }




    if(loading) return <p>Loading...</p>

    return (
        <div className='gallery-container'>
            <h1>Photo Gallery</h1>
            <div className="images-container">
                <ul className="images-list">
                    {photoUrls.map((url, index) => (
                        <PhotoItem key={index} url={url}/> 
                    ))}
                </ul>
            </div>
            
        </div>
    )
}

export default PhotoGallery
