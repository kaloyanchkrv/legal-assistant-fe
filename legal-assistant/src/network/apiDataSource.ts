import {apiClient} from "./index.ts";

export const defend = async (payload: { content: string, instructions: string}) => {
    const { data } = await apiClient.post<string>("/defend", payload)
    return data
}

export const nda = async (payload: { content: string, instructions: string}) => {
    const { data } = await apiClient.post<string>("/nda", payload)
    return data
}

export const analyze = async (payload: { content: string, instructions: string} ) => {
    const { data } = await apiClient.post<string>("/analyze", payload)
    return data
}


export const summarize = async (payload: { content: string, instructions: string }) => {
    const {data} = await apiClient.post<string>("/summarize", payload)
    return data
}