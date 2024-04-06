import { Image } from 'react-native';

import { checkImageURL } from '../../../utils';

const CImage = ({ imgURL, style }) => (
  <Image
    source={{
      uri: checkImageURL(imgURL)
        ? imgURL
        : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg',
    }}
    resizeMode="contain"
    style={style}
  />
);

export default CImage;
