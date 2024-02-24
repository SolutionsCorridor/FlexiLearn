const getImageExtension = (base64String: string) => {
    const parts = base64String.split(';');

    if (parts.length >= 2) {
        const imageFormat = parts[0].split(':')[1];
        const extension = imageFormat.split('/')[1];
        return extension;
    } else {
        // Handle cases where the base64 string format is invalid
        return null;
    }
}   

const base64ToBuffer = (base64String: string) => {
    const base64Image = base64String.split(',')[1];
    const imageBuffer = Buffer.from(base64Image, 'base64');
    return imageBuffer;
}

export { getImageExtension, base64ToBuffer };