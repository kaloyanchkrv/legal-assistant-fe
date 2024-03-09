import styled from "styled-components";

export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 40px;
`;

export const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  // Add more styling here
`;

export const Header = styled.header`
  text-align: center;
  // Add more styling here
`;

export const Content = styled.main`
  width: 100%;
  // Add more styling here
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  // Add more styling here
`;

export const Card = styled.div`
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 30%;
  // Add more styling here

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

// Add more styled components as needed...
