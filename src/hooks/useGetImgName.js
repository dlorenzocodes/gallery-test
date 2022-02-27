import { useState , useEffect } from 'react'
import { getStorage, ref, listAll } from 'firebase/storage'

export const useGetImgName = () => {

    const [imagesName, setImagesName] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {

        const getImagesName = async () => {
            try{
                const storage = getStorage()
                const imagesRef = ref(storage, 'images/')
                const res = await listAll(imagesRef)

                const imagesNameList = []

                res.items.forEach((img) => {
                    imagesNameList.push(img.name)
                })

                setImagesName(imagesNameList)
                setLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        
        getImagesName()
    },[])

    return { imagesName, loading }
}


