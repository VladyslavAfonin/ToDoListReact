import React from 'react';

// import '../app-header/app-header.css';
import styled from 'styled-components';

const Header = styled.div`
  align-items: flex-end;
  justify-content: space-between;
  display: flex;
  h1{
    font-size: 26px;
  }
  h2{
    font-size: 1.2rem;
    color: grey;
  }
`

const AppHeader = ({allPosts, liked}) => {
  return (
    <Header>
      <h1>Vladyslav Afonin</h1>
      <h2>{allPosts} записей, из них понравилось {liked}</h2>
    </Header>
  );
}

export default AppHeader;