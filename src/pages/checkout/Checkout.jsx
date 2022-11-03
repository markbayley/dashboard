import React from 'react'


export const Checkout = ({total, user}) => {
  return (
    <div>Checkout Total: ${total}
  <div className="details">
                        <h2 className="itemTitle">{user.displayName}</h2>
                        <div className="detailItem">
                          <span className="itemKey">Email:</span>
                          <span className="itemValue">{user.email}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Phone:</span>
                          <span className="itemValue">{user.phone}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Address:</span>
                          <span className="itemValue">{user.address}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Country:</span>
                          <span className="itemValue">{user.country}</span>
                        </div>
                      </div>
    
    </div>
  )
}
