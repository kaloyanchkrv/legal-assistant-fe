import React, {createContext, useContext, useState} from "react";
import {Box, Card, Group, Loader, LoadingOverlay, MantineProvider, rem, ScrollArea, Stack, Tabs} from "@mantine/core";
import styled from "styled-components";
import FileUpload from "./components/FileUpload.tsx";
import {analyze, summarize,} from "../network/apiDataSource.ts";
import {useDisclosure} from "@mantine/hooks";
import LoadingContext from "./screen/LoadingContext.ts";
import LoadingProvider from "./components/LoadingProvider.tsx";
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
`

const StyledCard = styled.div`
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    cursor: pointer;
    border: ${({isSelected}) => isSelected ? '2px solid #000057' : 'none'};

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
    max-height: min-content;
    /* Add more styles if necessary */
`;




const App: React.FC = () => {

    // const xIcon = <IconX style={{width: rem(20), height: rem(20)}}/>;

    const [analyze, setAnalyze] = useState(false)
    const [summarize, setSummarize] = useState(false)
    const [suggest, setSuggest] = useState(false)

    const [selectedCard, setSelectedCard] = useState(null);
    const cards = [
        {id: 'summarize', text: 'Summarize a document for me'},
        {id: 'analyze', text: 'Highlight problematic clauses, loopholes and risks for me'},
        {id: 'suggest', text: 'Suggest improvements to me'},
    ];
    const handleCardClick = (cardId: string) => {
        if (cardId == "analyze") {
            setAnalyze(true)
        } else {
            setAnalyze(false)
        }
        if (cardId == "summarize") {
            setSummarize(true)
        } else {
            setSummarize(false)
        }
        if (cardId == "suggest") {
            setSuggest(true)
        } else {
            setSuggest(false)
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
                            <StyledGroup justify="space-between" mt="md" mb="xs" preventGrowOverflow={false}>
                                <H1_5>Should you sign that document?</H1_5>
                                <H1_7>documents or confidentiality agreements are a fact of life if you're in
                                    business.</H1_7>
                                <H1_7>You've probably read tons of them, and you know more or less what you would
                                    accept.</H1_7>
                                <H1_7>Of course you can hire a lawyer to review that document. And you know they'll find
                                    faults and recommend changes to better protect you.</H1_7>
                                <H1_7> But it’ll cost you, in both time and money. And do you really need the perfect
                                    document, or is it OK to flag the key risks and move on?</H1_7>
                                <H1_7>That's where I come in. I’m an AI lawyerbot and I can review your document. Free of
                                    charge.</H1_7>
                            </StyledGroup>

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
                            {}

                        </Content>
                    </LoadingProvider>

                </ScrollArea>
                {analyze ? <Analyze/> : null}
                {summarize ? <Summarize/> : null}
                {suggest ? <Suggest/> : null}
                <Footer>© 2024 Your Company Name. All rights reserved.</Footer>
            </MainLayout>
        </MantineProvider>
    );
};

const Summarize = () => {

    const [visible, {toggle}] = useDisclosure(false);
    const [content, setContent] = useState<string>("")
    const [instructions, setInstructions] = useState<string>("")
    const [resultText, setResultText] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
    };

    const handleSummarize = async () => {
        toggle()
        setContent("")
        setInstructions("Summarize me the contract and give me the most important key points")
        if (file != null) {
            try {
                const data = await summarize({content, instructions, file})
                setResultText(data)
                toggle()
            } catch (error) {
                toggle()
            }
        }
    }

    return (
       <>
           <Box pos="relative">
               <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
               <Section>
                   <H1_5>Now let's see that document!</H1_5>
                   <FileUpload onFileSelect={handleFileSelect}/>
                   <StyledButton onClick={handleSummarize} disabled={!file}>Summarize information</StyledButton>

                   <H1_7>{resultText}</H1_7>
               </Section>
           </Box>
       </>
    )
};

const Suggest = () => {

    const [visible, {toggle}] = useDisclosure(false);
    const [content, setContent] = useState<string>("")
    const [instructions, setInstructions] = useState<string>("")
    const [resultText, setResultText] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
    };

    const handleSummarize = async () => {
        toggle()
        setContent("")
        setInstructions("Summarize me the contract and give me the most important key points")
        if (file != null) {
            try {
                const data = await summarize({content, instructions, file})
                setResultText(data)
                toggle()
            } catch (error) {
                toggle()
            }
        }
    }

    return (<Section>
        <H1_5>Now let's see that document!</H1_5>
        <FileUpload onFileSelect={handleFileSelect}/>
        <StyledButton onClick={handleSummarize} disabled={!file}>Analyze document</StyledButton>

        <H1_7>{resultText}</H1_7>
    </Section>)
};

const Analyze = () => {


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

            }
        }
    }

    return (
        <Section>
            <H1_5>Now let's see that document!</H1_5>
            <FileUpload onFileSelect={handleFileSelect}/>
            <StyledButton onClick={handleAnalyze} disabled={!file}>Analyze document</StyledButton>

            <H1_7>{resultText}</H1_7>
        </Section>
    )
};

export default App;
