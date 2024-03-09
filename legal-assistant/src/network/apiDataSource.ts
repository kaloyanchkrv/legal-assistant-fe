import {apiClient} from "./index.ts";

export const defend = async (payload: { content: string, instructions: string}) => {
    const { data } = await apiClient.post<string>("/defend", payload)
    return data
}

export const nda = async (payload: { content: string, instructions: string}) => {
    const { data } = await apiClient.post<string>("/nda", payload)
    return data
}

export const analyze = async (payload: { content: string, instructions: string, file: File} ) => {
    const { data } = await apiClient.post<string>("/analyze", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
            accept: "*/*",
        },
    })
    return data
}


export const summarize = async (payload: { content: string, instructions: string, file: File }) => {

    const {data} = await apiClient.post<string>("/summarize", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
            accept: "*/*",
        },
    })
    return data
}