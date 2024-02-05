interface EmailTemplateProps {
  firstName: string
}

export const EmailTemplateReact: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
)

export const EmailTemplateText = ({ firstName }: EmailTemplateProps) => {
  return `Welcome, ${firstName}!`
}
