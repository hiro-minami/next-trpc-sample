export const TopBar = () => {
    return (
        <div className="w-[100%] h-[40px] flex flex-row items-center justify-between bg-black px-4">
            <span className="text-[#000000] text-[20px] text-white">Site Patrol</span>
            <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                    <span className="material-icons text-white">person</span>
                    <span className="text-white text-[12px]">User Name</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <span className="material-icons text-white">settings</span>
                    <span className="text-white text-[12px]">設定</span>
                </div>
                <button className="text-white text-[12px]">ログアウト</button>
            </div>
        </div>
    )
}