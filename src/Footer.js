const Footer = ({usernameInput}) => {
    const today = new Date();
    return (
        <footer className='Footer'>
            <p> {usernameInput} &copy; {today.getFullYear()} </p>
           
        </footer>
    )
}

export default Footer
