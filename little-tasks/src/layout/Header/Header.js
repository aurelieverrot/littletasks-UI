import React from 'react';
import { Sticky } from 'semantic-ui-react'

const Header = () => {

  return (
    <header>  
      <Sticky>
        <div className="ui borderless inverted menu">   
            <h3 className="header item">Little Tasks</h3>
        </div>
      </Sticky>
    </header>
  )
};

export default Header;