import React, {useState} from "react";
import {MantineProvider, rem, Tabs} from "@mantine/core";
import styled from "styled-components";
import FileUpload from "./components/FileUpload.tsx";
import {IconX} from '@tabler/icons-react';
import {analyze, defend} from "../network/apiDataSource.ts";

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
    background-color: ${({disabled}) => (disabled ? "#666" : "#000057")}; // Darken when disabled
    color: ${({disabled}) => (disabled ? "#aaa" : "white")}; // Lighten text color when disabled
    padding: 1rem 2rem; // Increased padding for a larger button
    font-size: 1.25rem; // Increase font size if needed
    cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
    margin-left: auto; // To push the upload button to the right
    transition: background-color 0.3s, color 0.3s;
    border-radius: 5px; // Optional: if you want rounded corners

    &:hover {
        background-color: ${({disabled}) =>
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

const H1_5 = styled.h2`
    font-size: calc(1.5rem + 1vw); /* This is just an example, adjust the calculation as needed */
    /* Add more styles if necessary */
`;

const H1_7 = styled.body`
    font-size: calc(0.2rem + 1vw); /* This is just an example, adjust the calculation as needed */
    /* Add more styles if necessary */
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
    // const xIcon = <IconX style={{width: rem(20), height: rem(20)}}/>;
    const [shouldShowError, setShouldShowError] = useState<boolean>(false)
    const [content, setContent] = useState<string>("")
    const [instructions, setInstructions] = useState<string>("")
    const [resultText, setResultText] = useState<string>("")

    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
    };

    const handleAnalyze = async () => {
        setContent("")
        setInstructions("Analyse the document and give a suggestion for improvements")
        if (file != null) {
            try {
                const data = await analyze({content, instructions, file})
                setResultText(data)
            } catch (error) {
                setShouldShowError(true)
            }
        }
    }

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
                    <SectionHeader>
                        <StyledTabs defaultValue="summarize" variant="outline">
                            <Tabs.List>
                                <StyledTab value="summarize">Summarize</StyledTab>
                                <StyledTab value="analyze">Analyze</StyledTab>
                                <StyledTab value="enforce">Enforce</StyledTab>
                            </Tabs.List>
                        </StyledTabs>
                    </SectionHeader>
                    <Section>
                        <H1_5>Now let's see that document!</H1_5>
                        <FileUpload onFileSelect={handleFileSelect}/>
                        <StyledButton onClick={handleAnalyze} disabled={!file}>Analyze document</StyledButton>

                        <H1_7>{resultText}</H1_7>
                    </Section>
                </Content>
                <Footer>© 2024 Your Company Name. All rights reserved.</Footer>
            </MainLayout>
        </MantineProvider>
    );
};

export default App;
