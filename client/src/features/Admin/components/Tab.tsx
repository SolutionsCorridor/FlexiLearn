const Tab = ({ title, value, activeTab, setActiveTab }: { title: string, value: string, activeTab: string, setActiveTab: any }) => {
    return (
        <div
            className={`cursor-pointer ${activeTab === value ? 'h-full flex items-center px-8 text-lg bg-white' : ''}`}
            onClick={() => setActiveTab(value)}>
            {title}
        </div >
    )
}

export default Tab