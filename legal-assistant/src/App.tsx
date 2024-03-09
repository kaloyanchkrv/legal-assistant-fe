import React from "react";
import { MantineProvider } from "@mantine/core";
import styled from "styled-components";
import FileUpload from "./FileUpload";

// Define your styled components here
const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff; // Assuming a light theme based on screenshots
`;

const StyledHeader = styled.header`
  background-color: #000057; // Dark header background
  padding: 1rem 0;
  width: 100%;
`;

const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const StyledButton = styled.button`
  border: none;
  background-color: #000057; // Use color from your design
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-left: auto; // To push the upload button to the right
`;

const StyledLink = styled.a`
  color: white;
  margin: 0 1rem;
  text-decoration: none;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  text-align: center;
`;

const Card = styled.div`
  background-color: #f7f7f7; // Light background for cards
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 2rem; // Space between cards
  width: 100%; // Full width of the container
`;

const Footer = styled.footer`
  background-color: #000057;
  color: white;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <MantineProvider>
      <MainLayout>
        <StyledHeader>
          <NavigationBar>
            <StyledLink href="#">Home</StyledLink>
            <StyledLink href="#">Services</StyledLink>
            <StyledLink href="#">About Us</StyledLink>
            <StyledLink href="#">Contact</StyledLink>
          </NavigationBar>
        </StyledHeader>
        <Content>
          <Section>
            <h1>Should you sign that document?</h1>
            <FileUpload />
            <StyledButton>Upload Document</StyledButton>
          </Section>
          <Section>
            <Card>
              <p>Summarize a document for me</p>
            </Card>
            <Card>
              <p>Highlight problematic clauses, loopholes and risks for me</p>
            </Card>
            <Card>
              <p>Suggest improvements to me</p>
            </Card>
            {/* Add more cards as needed */}
          </Section>
        </Content>
        <Footer>© 2024 Your Company Name. All rights reserved.</Footer>
      </MainLayout>
    </MantineProvider>
  );
};

export default App;
