const API_URL = import.meta.env.VITE_API_URL || 'https://aicancer.io.vn/api';

export const EndPoints = {
    mutationLung20Gene: `${API_URL}/mutation-lung-gene/top20`,
    mutationLiver20Gene: `${API_URL}/mutation-liver-gene/top20`,
    mutationBreast20Gene: `${API_URL}/mutation-breast-gene/top20`,
    mutationThyroid20Gene: `${API_URL}/mutation-thyroid-gene/top20`,
    mutationColorectal20Gene: `${API_URL}/mutation-colorectal-gene/top20`,

    // Add others as needed
    currentUser: `${API_URL}/user/current-user`,
    login: `${API_URL}/user/login`,
};
