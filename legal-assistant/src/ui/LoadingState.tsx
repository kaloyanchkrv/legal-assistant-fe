import LoadingContext from '../ui/screen/LoadingContext.ts'
import {LoadingOverlay} from "@mantine/core";
import {useContext} from "react";

const Spinner = () => {
    const { loadingCount } = useContext(LoadingContext)

    return (
        <>
            {loadingCount > 0 && (
                <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            )}
        </>
    )
}

export default Spinner