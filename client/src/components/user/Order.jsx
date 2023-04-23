import Nav from '../home/Nav';

import {Empty} from "../common/common"
import React from 'react'

export default function Order() {
  return (
    <div>
      <Nav back nosearch title="My Orders"/>
      <div className="body empty_order_box">
        <Empty/>
      </div>
    </div>
  )
}
