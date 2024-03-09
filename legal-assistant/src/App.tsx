import React, { useState } from "react";
import { MantineProvider } from "@mantine/core";
import styled from "styled-components";
import FileUpload from "./FileUpload";

// Define your styled components here
const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
`;

const StyledHeader = styled.header`
  background-color: #000057;
  padding: 1rem 0;
  width: 100%;
`;

const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button<{ disabled: boolean }>`
  border: none;
  background-color: ${({ disabled }) => (disabled ? "#666" : "#000057")}; // Darken when disabled
  color: ${({ disabled }) => (disabled ? "#aaa" : "white")}; // Lighten text color when disabled
  padding: 1rem 2rem; // Increased padding for a larger button
  font-size: 1.25rem; // Increase font size if needed
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-left: auto; // To push the upload button to the right
  transition: background-color 0.3s, color 0.3s;
  border-radius: 5px; // Optional: if you want rounded corners

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "#666" : "#0000af"}; // Slightly change color on hover if not disabled
  }
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

// const Card = styled.div<{ isSelected: boolean }>`
//   background-color: #f7f7f7; // Light background for cards
//   border-radius: 5px;
//   box-shadow: ${({ isSelected }) =>
//     isSelected ? "0 0 15px rgba(0, 0, 255, 0.5)" : "0 2px 4px rgba(0, 0, 0, 0.1)"}; // Highlight when selected
//   padding: 1rem;
//   margin-bottom: 2rem; // Space between cards
//   width: 100%; // Full width of the container
//   cursor: pointer;
// `;

const Footer = styled.footer`
  background-color: #000057;
  color: white;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
`;

const App: React.FC = () => {
  // const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // const selectCard = (cardId: string) => {
  //   setSelectedCard(cardId);
  // };

  // interface CardData {
  //   id: string;
  //   text: string;
  // }

  //const cards: CardData[] = [{ id: "summarize", text: "Summarize a document for me" }];

  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  return (
    <MantineProvider>
      <MainLayout>
        <StyledHeader>
          <NavigationBar>
            <NavLinks>
              <StyledLink href="#">Home</StyledLink>
              <StyledLink href="#">Services</StyledLink>
              <StyledLink href="#">About Us</StyledLink>
              <StyledLink href="#">Contact</StyledLink>
            </NavLinks>
          </NavigationBar>
        </StyledHeader>
        <Content>
          <Section>
            <h1>Now let's see that document!</h1>
            <FileUpload onFileSelect={handleFileSelect} />
            <StyledButton disabled={!file}>Analyze document</StyledButton>
          </Section>
          {/* <Section>
            {cards.map((card) => (
              <Card key={card.id} isSelected={selectedCard === card.id} onClick={() => selectCard(card.id)}>
                <p>{card.text}</p>
              </Card>
            ))}
          </Section> */}
        </Content>
        <Footer>© 2024 Your Company Name. All rights reserved.</Footer>
      </MainLayout>
    </MantineProvider>
  );
};

export default App;
