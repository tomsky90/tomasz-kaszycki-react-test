export const getTitle = (string) => {
    const title = string.split(' ')
    .splice(0,1)
    .join('')
    return title    
}


export const getSubTitle = (string) => {
    const subTitle = string.split(' ')
    .splice(1)
    .join(' ')
    return subTitle
}