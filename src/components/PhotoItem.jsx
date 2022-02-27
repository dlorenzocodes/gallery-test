import { motion } from  'framer-motion'

function PhotoItem({url}) {

    const styles ={
        background: `url(${url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }

    return (
        <li>
            <motion.div 
                initial={{ opacity: 0, x: '100px'}}
                animate={{ opacity: 1, x: '0' }}
                transition={{delay: 0.5, type: 'tween', duration: 0.5}}
                className='image-wrapper'
                style={styles}
            ></motion.div>
        </li>             
    )
}

export default PhotoItem
