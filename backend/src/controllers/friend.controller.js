export const addFriend = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Lỗi khi gửi yêu cầu kết bạn", error)
        return res.status(500).json({message: "Lỗi khi gửi yêu cầu kết bạn"})
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Lỗi khi chấp nhận yêu cầu kết bạn", error)
        return res.status(500).json({message: "Lỗi khi chấp nhận yêu cầu kết bạn"})
    }
}

export const declineFriendRequest = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Lỗi khi từ chối yêu cầu kết bạn", error)
        return res.status(500).json({message: "Lỗi khi từ chối yêu cầu kết bạn"})
    }
}

export const getAllFriends = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bạn bè", error)
        return res.status(500).json({message: "Lỗi khi lấy danh sách bạn bè"})
    }
}

export const getFriendRequests = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Lỗi khi lấy tất cả yêu cầu kết bạn", error)
        return res.status(500).json({message: "Lỗi khi lấy tất cả yêu cầu kết bạn"})
    }
}
