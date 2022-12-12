import React from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import UsersList from '../components/UsersList';

const UsersOverview = () => {
    
    return ( 
        <React.Fragment>
            <Header />
            <UsersList />
            <Footer />
        </React.Fragment>
    );
}
 
export default UsersOverview;