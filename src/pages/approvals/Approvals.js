import React from 'react'
import './Approvals.css'

export default function Approvals() {

    return (
        <section
            className='approvals-page'
        >
            <h2> Approvals & Reviews</h2>
            <p>Verify the Uploaded details and take action</p>

            {/* File Details Card */}
            <div
                className='details-card'
            >
                <h3>File Details</h3>

                <p><strong>File:</strong> Contract.pdf</p>
                <p><strong>Category:</strong> Legal</p>
                <p><strong>Status:</strong> Pending</p>
                <p><strong>Description:</strong> Supplier Contracy review</p>
                <p><strong>Uploaded by:</strong> Bruce</p>
            </div>

            {/* Review Section */}
            <div
                className='review-card'
            >
                <h3> Review Decision</h3>
                <textarea placeholder='Add comments... '></textarea>
                
                <div
                    className='actions'
                >
                    <button className='approve-btn'>Approve</button>
                    <button className='reject-btn'>Reject</button>
                </div>
            </div>

            {/* History Section */}
            <div className="history-card">
                <h3>Approval History</h3>
                <ul>
                    <li>Uploaded by Bruce – 16 Sep 2025</li>
                    <li>Pending Review</li>
                </ul>
            </div>

        </section>
    )
}