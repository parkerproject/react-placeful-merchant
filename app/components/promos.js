import React, { PropTypes } from 'react';
import Table from './partials/table';
import { Link } from 'react-router';

const Promos = (props) => (
  <div className="box">
    <div className="box-header">
      <Link to="/promo/new" className="btn btn-success"> Add new Promo
      </Link>
    </div>
    <div className="box-body overview">
      <div className="row">
        <div className="col-xs-12">
          <div className="box">
            <div className="box-body">
              <div id="example1_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                <div className="row">
                  <div className="col-sm-12">
                    <Table data={props.promos} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


Promos.propTypes = {
  promos: PropTypes.array,
};

export default Promos;
