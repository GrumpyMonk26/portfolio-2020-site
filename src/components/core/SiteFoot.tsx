import React from 'react'
import SocialIcons from './SocialIcons'

const SiteFoot: React.FC<{}> = () => {
  return (
    <footer className="c-site-foot ">
      <div className="container text-white uppercase">
        <SocialIcons twitter linkedIn github />
      </div>
    </footer>
  )
}

export default SiteFoot
