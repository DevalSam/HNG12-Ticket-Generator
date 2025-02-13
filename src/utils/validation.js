export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateImageUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    const validProtocols = ['http:', 'https:'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    
    if (!validProtocols.includes(parsedUrl.protocol)) {
      return false;
    }

    const hasValidExtension = validExtensions.some(ext => 
      parsedUrl.pathname.toLowerCase().endsWith(ext)
    );

    return hasValidExtension || parsedUrl.hostname.includes('cloudinary.com');
  } catch {
    return false;
  }
};