import React from 'react';
import { Sticky } from 'semantic-ui-react'

const Header = () => {

  return (
    <header>  
      <Sticky>
        <div className="ui borderless inverted menu">   
            <div className="header item">Little Tasks</div>
        </div>
      </Sticky>
    </header>
  )
};

export default Header;