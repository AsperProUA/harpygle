import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';

import Footer from './Footer';

const style = theme => ({
    root: {
        padding: '20px 80px',
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontSize: 18,
        color: '#979797',
        '& h5': {
            fontSize: 19,
            fontWeight: 'bold',
            color: '#636363',
            marginBlockStart: '3em',
            marginBlockEnd: '1.2em',
        },
        '& li': {
            marginBlockStart: '1em',
            marginBlockEnd: '1em',
        },
        '& ul': {
            marginTop: '0',
        },
        '& p': {
            marginBlockStart: '0.5em',
            marginBlockEnd: '0.5em',
        }

    },
    wellcome: {
        fontSize: 22,
    },
});

function Thanks(props) {
    const { classes } = props;
    return (
        <div>
            <Header />
            <div className={classes.root}>

                <h1>Terms and conditions</h1>
                <p className={classes.wellcome}>Wellcome to Harpygle. These are the terms and conditions governing your access to and use of the website Harpygle.com</p>
                <p className={classes.wellcome}>By accessing, browsing, and using our website or any of our applications through whatever platform and/or by placing your order, you acknowledge and agree to have read, understood, and agreed to the terms and conditions set out below</p>

                <h5>Communications</h5>
                <p>- We will send notices and any pertinent information to you on the e-mail address you provided while registering to Harpygle website or have subsequently updated.</p>
                <p>- You can contact us through the channels mentioned in the contact us page (Facebook, Instagram, and E-mail ).</p>
                <p>- Requests placed past our working hours that need an immediate action from our side are not valid.</p>

                <h5>Account and Registration</h5>
                <p>- Customers can only own one registered account and Harpygle has the right to suspend any user with multiple accounts.</p>
                <p>- Harpygle has the right to ask for verification through the phone, email or at the front office to verify the account holder.</p>
                <p>- Harpygle might ask you for a copy of your national ID, when needed, to avoid shipment(s) held/delays in customs.</p>
                <p>- Your National ID should be Valid.</p>
                <p>- The name you register with on your Harpygle account should match your name on your national ID, to avoid any issues at customs clearance.</p>
                <p>- We will only be responsible for the delay if you already uploaded your ID when it was requested.</p>

                <h5>Placing your order</h5>
                <p>- You will need to read the product(s) listing carefully to make sure products that arrive match the seller's description. (E.g. making sure your electronic product's voltage matches your country's voltage system).</p>
                <p>- All Facebook page calculations/quotations or any other means that are affiliated with us are just estimates.</p>
                <p>- You are responsible for filling in your order's specifications accurately as written on the seller's listing such as your product's color, size or model to avoid any delays in the review process or any wrongly received products.</p>
                <p>- General Size charts may give approximate values and measurements, therefore your product(s) sizing may not match the measurements mentioned on the chart.</p>
                <p>- Only one coupon code can be issued per person per account.</p>
                <p>- Coupons are not redeemable for cash and are valid for one time & one purchase only.</p>

                <h5>Review & Purchasing</h5>
                <p>- Reviewing your order will be within one business day and It will be purchased within two business days from the payment date.</p>
                <p>- Domestic shipping fees & rates are charged by the seller and it will be added to your order after the review process.</p>
                <p>- You can cancel/edit your item(s) before you pay for it, once you pay, cancellation/ edit won’t be available. It can only be canceled if we haven’t purchased it yet.</p>
                <p>- Harpygle does not guarantee to deliver the gifts/samples your order might include on the seller's website.</p>
                <p>- The price you are notified with during the review process can be changed, if it gets changed after you make your payment we will notify you by email.</p>
                <p>- You can choose the Final cost option while placing your order (from the beginning) which means after you make your order (mostly within the same day) we will review it and apply the estimated weight on your order.</p>
                <p>- Final cost orders cannot be reweighted when they reach our office in Morocco.</p>
                <p>- Quantity limitations may change according to authorities or customs regulations.</p>

                <h5>Returns from our warehouse at France</h5>

                <p>- Harpygle may return your order if it hasn’t been shipped from our warehouse at France after checking the availability with the seller.</p>
                <p>- Products shipped from France are not returnable.</p>
                <p>- Sellers/Merchants policy will be considered.</p>
                <p>- Additional fees such as (Restocking fees – drop off fees– shipping fees-etc.) will be charged, if applicable.</p>
                <p>- Harpygle has the right to cancel\stop the return service from the warehouses during high peak seasons or based on a specific circumstance.</p>

                <h5>Shipping, Clearance & Storage</h5>

                <p>- Wolfepreneur's service level starts when the shipment arrives at one of our warehouses, the period before we receive the order(s) at any of our warehouses depends on the seller, not Harpygle.</p>
                <p>- Harpygle is not responsible for any delay may cause from the seller side while shipping your order to one of our warehouses.</p>
                <p>- The weight mentioned on the seller's site is an approximation and may not be exact.</p>
                <p>- Once your order reaches our local office and be ready for delivery, we will store it for you, free of charge, for a period of up to 10 days, after 10 days your order might be deemed abandoned and we may dispose of it in any manner permitted by law.</p>
                <p>- Some products may arrive opened/unsealed due to customs clearance and checking process, in such a case, Harpygle will not be able to refund or return those products.</p>
                <p>- By default, the international shipping fees (weight fees) is to be determined and applied before we receive your order to our France office. If the weight of your order more than what calculated, we will request the extra fees before shipping to our office in Morocco.</p>

                <h5>Shipment Prerequisites</h5>
                <ul>
                    <li>Prices are for the first 2KG.</li>
                    <li>For bigger weights and sizes, an additional MAD 5 is added for each 1 KG</li>
                    <li>Maximum allowed weight/shipment in 10 KG</li>
                    <li>Maximum value/shipment is MAD 10,000</li>
                    <li>We do not deal with the following types of shipments: (Furniture – Cash – fluids of any kind – food – Medications or chemicals – cosmetics prone to temperature damage – drugs – fragile stuff – stuff that gets damaged by bending or scratching during transportation and handling – any law prohibited objects – pets or living creatures - expensive objects because of material they are made of or craftsmanship – jewelry).</li>
                    <li>If the shipper sends any of the prohibited categories above, the company has the right to reject it. If it was accepted by mistake, negligence or on goodwill basis, the responsibility still falls on the shipper solely without any liabilities on Harpygle.</li>
                    <li>Harpygle is not responsible for the shipment content and its delivery responsibility seizes right after delivery.</li>
                    <li>In case Harpygle suspected the content of any shipment, it has the right to open for a health check.</li>
                    <li>Shipper is fully responsible for packing the shipments in a way that completely protects it from damages like scratches, cracks, distortion and bending or components split during handling and transportation and thus has no right in complaining about such damages in case of failing at properly packaging the shipments (shipments are handled in a way similar to airline companies handling bags that are left at the conveyor and stored inside the plane as belly cargo).</li>
                    <li>Optional Insurance does not waive the shipper from properly packaging the shipments in a way that completely protects it from all sorts of damages mentioned above from the pickup point until it reach its destinations via the standard handling and transportation procedures of couriers like Harpygle.</li>
                </ul>

                <h5>Shipper Required Data</h5>
                <ol>
                    <li> Name, Middle Name, and Surname are required to create an account.</li>
                    <li> Company Name is required. If no Company Name is provided, the client full name will be displayed on the AWB at the Company Name field.</li>
                    <li> Default Phone Number – others can be added – representing the official contact number for the account and through which all actions are taken with Harpygle and with which Harpygle can reach customer via calls or important notifications SMS.</li>
                    <li> A copy of a valid National ID/Passport to be sent to <a href="mailto:documents@harpygle.com">documents@harpygle.com</a></li>
                    <li> To activate the service, Harpygle Customer Support will send the client via mail the detailed T&Cs that were briefly shared with the client during the Welcome Call and the client has to kindly reply back with an acceptance mail.</li>
                    <li> Pickups are requested before 12:00pm daily for a pickup to be collected on the same day. If a pickup request is made past noon time, the pickup will either be collected the following day or at any other convenient time for the shipper.</li>
                    <li> Within city shipments are delivered within 48 hours following the pickup date, taking into consideration the weekends and public holidays.</li>
                    <li> Between cities shipments are delivered within 96 hours following the pickup date, taking into consideration the weekends and public holidays.</li>
                    <li> In case a shipment was rejected by a consignee and the consignee refused to pay the delivery fees, the fees are to be paid by the shipper.</li>
                    <li> In case the shipper cancelled a shipment that was already picked up by Harpygle, the shipper is due to pay 50% of the delivery fees of the subject shipment.</li>
                    <li> Returns are delivered to the shipper in person</li>
                    <li>Cash Settlement transferred via a Bank Transfer or to be paid via Paypal, or Payoneer</li>
                </ol>

            </div>
            <Footer/>
        </div>
    );
}

Thanks.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(Thanks);