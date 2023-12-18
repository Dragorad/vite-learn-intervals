import { Toaster } from 'react-hot-toast'

function CustomToaster() {

    return (
        <Toaster
            position='top-right'
            gutter={4}
            containerClassName='toast-container'
            containerStyle={{

            }}
            toastOptions={{
                duration: 6000,
                error: {
                    style: {
                        color: "#edf3ff",
                        backgroundColor: '#c10413'
                    }
                },
                success: {
                    style: {
                        color: "#FFFFFF",
                        backgroundColor: '#1c6d86'
                    }
                },
                custom: {
                    style: {
                        color: "#edf3ff",
                        backgroundColor: '#2b56da'
                    }
                },
                info: {
                    style: {
                        color: "#5a0711",
                        backgroundColor: '#edf3ff'
                    }
                }


            }}

        />
    )
}

export default CustomToaster