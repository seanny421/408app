import Image from "next/image"
import {FC} from 'react';

interface IProps {
  imageURL: string
}

const Thumbnail: FC<IProps> = ({imageURL}: IProps) => {
  return (
    <div className="image-wrapper">
      <Image 
        src={imageURL} 
        style={{borderRadius: '20px'}}
        alt="thumbnail" 
        width={640/2}
        height={480/2}
        priority
        objectFit="cover"
        />
    </div>
  )

}

export default Thumbnail; 
