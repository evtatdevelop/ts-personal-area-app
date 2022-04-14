import Service from "../services";
import React from "react";

const ServiceContext: React.Context<Service> = React.createContext(new Service());

export default ServiceContext;