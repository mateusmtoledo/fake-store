import fullStarIcon from "../icons/full-star.svg";
import halfStarIcon from "../icons/half-star.svg";
import emptyStarIcon from "../icons/empty-star.svg";
import styles from "./styles/UserRating.module.css";

const starIcons = {
  full: {
    src: fullStarIcon,
    alt: 'Full star',
  },
  half: {
    src: halfStarIcon,
    alt: 'Half star',
  },
  empty: {
    src: emptyStarIcon,
    alt: 'Empty star',
  }
}

function UserRating({ rating, count }) {
  let roundedRating = Math.round(rating * 2) / 2;
  const stars = [];
  for(let i = 0; i < 5; i += 1) {
    if(roundedRating >= 1) {
      stars.push(starIcons.full);
      roundedRating -= 1;
    } else if(roundedRating === 0.5) {
      stars.push(starIcons.half);
      roundedRating -= 0.5;
    } else {
      stars.push(starIcons.empty);
    }
  }


  return (
    <div>
      <div>
        {
          stars.map((star, index) => (
            <img className={styles.star} key={index} src={star.src} alt={star.alt} />
          ))
        }
      </div>
      <p className={styles.rating}>{rating} / 5 ({count})</p>
    </div>
  );
}

export default UserRating;
