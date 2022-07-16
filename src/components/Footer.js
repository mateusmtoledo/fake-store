import githubIcon from '../icons/github.png';

function Footer() {
  return (
    <footer>
      <a href='https://github.com/mateusmtoledo' className='github-link'>
        <img src={githubIcon} alt='GitHub' />
        <p>mateusmtoledo</p>
      </a>
    </footer>
  );
}

export default Footer;
