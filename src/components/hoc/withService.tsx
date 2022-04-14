import ServiceContext from "../../serviceContext";

const WithService = () => (Wrapped: React.FC<any>) => {
  return (props: any) => {
    return (
      <ServiceContext.Consumer>
        {
          (Service) => {
            return <Wrapped {...props} Service={Service}/>
          }
        }
      </ServiceContext.Consumer>
    )
  }
}

export default WithService;