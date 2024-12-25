import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';

import languagesText from '../../../LanguagesData/LanguagesText'

const WelcomePage = props => {
  const {language} = props;
  const history = useHistory();
  let texts = {...languagesText[language].welcomePage}
  
  
    return (
      <div className='landing'>
        
        {language !== '' &&
      
      <div className='welcome-text'>
        <h2>{texts.welcomeH2}</h2>
        <h3>{texts.welcomeH3}</h3>
        {texts.exampleTexts.map((el, idx) => <p className={'welcome-text'} key={idx}>{el}</p>)}
        <button className='button'
                onClick={() => history.push('/control-form')}>{texts.startButton.toUpperCase()}</button>
      </div>}
      </div>
    )
  }


function mapStateToProps (state) {
  return {
    language: state.languageSelected
  }
}


export default connect(mapStateToProps)(WelcomePage)
