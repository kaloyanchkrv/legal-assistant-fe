import React, { createContext, useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  Group,
  Loader,
  LoadingOverlay,
  MantineProvider,
  rem,
  ScrollArea,
  Stack,
  Tabs,
} from "@mantine/core";
import styled from "styled-components";
import FileUpload from "./components/FileUpload.tsx";
import { analyze, summarize } from "../network/apiDataSource.ts";
import { useDisclosure } from "@mantine/hooks";
import LoadingProvider from "./components/LoadingProvider.tsx";
import Markdown from "react-markdown";
import Emoji from "./components/Emojy.tsx";
import emailjs from "@emailjs/browser";

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
  margin: 10rem auto 2rem; // Increased the top margin to 4rem from 2rem
  text-align: center;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 10rem; // Significantly increased the bottom margin
`;

const Footer = styled.footer`
  background-color: #000057;
  color: white;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
`;

const StyledTabs = styled(Tabs)`
  font-size: 1.25rem; // Make tabs text larger

  button {
    padding: 1rem 2rem; // Increase padding inside tabs
    border: 1px solid transparent; // Add border to tabs

    &:not(:last-of-type) {
      margin-right: 1rem; // Add space between tabs
    }

    &:hover {
      border-color: #000057; // Border color on hover
      background-color: #f0f0f0; // Optional: change background on hover
    }
  }
`;

const StyledTab = styled(Tabs.Tab)`
  font-size: 1.25rem; // Make tabs text larger
  padding: 1rem 2rem; // Increase padding inside tabs
  border: 1px solid black; // Add border to tabs
  margin-right: 1rem; // Add space between tabs
  cursor: pointer; // Cursor pointer for better UX

  // Default non-active state
  background-color: white; // White background for non-active tab
  color: black; // Black text for non-active tab

  &:hover:not(.mantine-Tabs-tabActive) {
    background-color: #f7f7f7; // Very light grey background on hover for non-active tabs
    // No need to change text color on hover if it's already black
  }

  &.mantine-Tabs-tabActive {
    background-color: #4348a0; // A slightly brighter blue than #000057
    color: white; // White text for active tab
    border-color: #4348a0; // Matching border color for active tab
  }
`;

const StyledCardDefault = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: #1a1a1a;
  width: min-content;
  margin: 0 auto;
`;

const StyledGroup = styled(Group)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: #1a1a1a;
  width: min-content;
  margin: 0 auto;
  max-height: 300px;
`;

const StyledCard = styled.div`
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  cursor: pointer;
  border: ${({ isSelected }) => (isSelected ? "2px solid #000057" : "none")};

  &:hover {
    background-color: #e7e7e7;
  }
`;

const H1_5 = styled.h2`
  font-size: calc(1.5rem + 1vw); /* This is just an example, adjust the calculation as needed */
  /* Add more styles if necessary */
`;

const H1_7 = styled.body`
  font-size: calc(0.2rem + 1vw); /* This is just an example, adjust the calculation as needed */
  max-height: 20px;
  /* Add more styles if necessary */
`;

const App: React.FC = () => {
  // const xIcon = <IconX style={{width: rem(20), height: rem(20)}}/>;

  const [analyze, setAnalyze] = useState(false);
  const [summarize, setSummarize] = useState(false);
  const [suggest, setSuggest] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const cards = [
    { id: "summarize", text: "Summarize a document for me" },
    { id: "analyze", text: "Highlight problematic clauses, loopholes and risks for me" },
    { id: "suggest", text: "Suggest improvements to me" },
  ];
  const handleCardClick = (cardId: string) => {
    if (cardId == "analyze") {
      setAnalyze(true);
    } else {
      setAnalyze(false);
    }
    if (cardId == "summarize") {
      setSummarize(true);
    } else {
      setSummarize(false);
    }
    if (cardId == "suggest") {
      setSuggest(true);
    } else {
      setSuggest(false);
    }
    setSelectedCard(cardId);
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
        <ScrollArea>
          <LoadingProvider>
            <Content>
              <H1_5>
                <Emoji symbol="👋" /> Hey there, how can I help?
              </H1_5>
              <Section>
                {cards.map((card) => (
                  <StyledCard
                    key={card.id}
                    isSelected={selectedCard === card.id}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <p>{card.text}</p>
                  </StyledCard>
                ))}
              </Section>
            </Content>
          </LoadingProvider>
        </ScrollArea>
        {analyze ? <Analyze /> : null}
        {summarize ? <Summarize /> : null}
        {suggest ? <Suggest /> : null}
        <Footer>© 2024 Your Company Name. All rights reserved.</Footer>
      </MainLayout>
    </MantineProvider>
  );
};

const Summarize = () => {
  const [visible, setVisible] = useState(true);
  const [content, setContent] = useState<string>("");
  const [instructions, setInstructions] = useState<string>(
    "Summarize me the contract and give me the most important key points. Return the response in academic style"
  );
  const [resultText, setResultText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleSummarize = async () => {
    setVisible(false); // Start loading
    if (file != null) {
      try {
        const data = await summarize({ content, instructions, file });
        setResultText(data);
      } catch (error) {
        console.error("Error during summarization:", error);
      } finally {
        setVisible(true); // Stop loading
      }
    }
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(blob);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch (error) {
      alert("Error copying to clipboard:", error);
    }
  };

  return (
    <>
      <Box pos="relative">
        {!visible ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif" alt="Loading..." />
          </div>
        ) : (
          <Section>
            <H1_5>Now let's see that document!</H1_5>
            <FileUpload onFileSelect={handleFileSelect} />
            <StyledButton onClick={handleSummarize} disabled={!file}>
              Summarize information
            </StyledButton>

            <Markdown>{resultText}</Markdown>
            {resultText !== "" && <Button onClick={downloadTxtFile}>Download PDF</Button>}
            {resultText !== "" && (
              <Button onClick={async () => await copyToClipboard(resultText)}>Copy to clipboard</Button>
            )}
          </Section>
        )}
      </Box>
    </>
  );
};

const Analyze = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [content, setContent] = useState<string>("");
  const [instructions, setInstructions] = useState<string>(
    "Analyse the document and highlight problematic clauses, loopholes and risk for me. Return the response in academic style"
  );
  const [resultText, setResultText] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    toggle();
    if (file != null) {
      try {
        const data = await analyze({ content, instructions, file });
        setResultText(data);
        toggle();
      } catch (error) {
        toggle();
      }
    }
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  const copyToClipboard = async (text: string) => {
    try {
      const permissions = await navigator.permissions.query({ name: "clipboard-write" });
      if (permissions.state === "granted" || permissions.state === "prompt") {
        await navigator.clipboard.writeText(text);
        alert("Text copied to clipboard!");
      } else {
        alert("You need to enabled your browser permissions");
      }
    } catch (error) {
      alert("Error copying to clipboard:");
    }
  };

  return (
    <Section>
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <H1_5>Now let's see that document!</H1_5>
      <FileUpload onFileSelect={handleFileSelect} />
      <StyledButton onClick={handleAnalyze} disabled={!file}>
        Analyze document
      </StyledButton>

      {/*{resultText == "" ? null : <H1_7>Here is what I got for you.</H1_7>}*/}
      <Markdown>{resultText}</Markdown>
      {/* Ensure to pass the same id to the target component */}
      {resultText == "" ? null : <Button onClick={downloadTxtFile}>Download PDF</Button>}

      {resultText == "" ? null : (
        <Button
          onClick={async () => {
            await copyToClipboard(resultText);
          }}
        >
          Copy to clipboard
        </Button>
      )}
    </Section>
  );
};

const Suggest = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [content, setContent] = useState<string>("");
  const [instructions, setInstructions] = useState<string>(
    "Analyse the document and give a suggestion for improvements. Return the response in academic style."
  );
  const [resultText, setResultText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleSummarize = async () => {
    toggle();
    if (file != null) {
      try {
        const data = await analyze({ content, instructions, file });
        setResultText(data);
        toggle();
      } catch (error) {
        toggle();
      }
    }
  };
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  const copyToClipboard = async (text: string) => {
    try {
      const permissions = await navigator.permissions.query({ name: "clipboard-write" });
      if (permissions.state === "granted" || permissions.state === "prompt") {
        await navigator.clipboard.writeText(text);
        alert("Text copied to clipboard!");
      } else {
        alert("You need to enabled your browser permissions");
      }
    } catch (error) {
      alert("Error copying to clipboard:");
    }
  };

  return (
    <Box>
      {visible ? (
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      ) : (
        <Section>
          <H1_5>Now let's see that document!</H1_5>
          <FileUpload onFileSelect={handleFileSelect} />
          <StyledButton onClick={handleSummarize} disabled={!file}>
            Analyze document
          </StyledButton>

          <Markdown>{resultText}</Markdown>
          {resultText == "" ? null : <Button onClick={downloadTxtFile}>Download PDF</Button>}
          {resultText == "" ? null : (
            <Button
              onClick={async () => {
                await copyToClipboard(resultText);
              }}
            >
              Copy to clipboard
            </Button>
          )}
        </Section>
      )}
    </Box>
  );
};

export default App;
