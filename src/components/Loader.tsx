const Loader = () => {
    return (
        <>
            <div className='h-screen w-screen absolute top-0 left-0 flex justify-center items-center backdrop-brightness-75 z-50'>
                <div className="relative bg-[#fff] w-14 h-14 p-1 rounded-full m-1">
                    <div className="absolute top-[-12px] left-[-12px] animate-spin w-20 h-20 border-4 border-t-green-600 border-b-green-600 border-l-transparent border-r-transparent rounded-full" />
                    <div className="flex aspect-square items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                        <img src="/icon.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader