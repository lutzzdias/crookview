import styles from '../styles/Review.module.css';

export default function ItemCard(props) {
  return (
    <>
      <div className={styles.testimonialBoxContainer}>
        <div className={styles.column}>
          <div className={styles.boxTop}>
            <div className={styles.profile}>
              <div className={styles.profileImg}>
                <img
                  src="https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png"
                  alt="User avatar"
                />
              </div>
              <div className={styles.nameUser}>
                <strong>{props.review.title}</strong>
                <span>{props.review.user.username}</span>
              </div>
            </div>
            <div className={styles.rating}>{props.review.rating} / 5</div>
          </div>
          <div className={styles.clientComment}>
            <p>{props.review.body}</p>
          </div>
        </div>
      </div>
    </>
  );
}
