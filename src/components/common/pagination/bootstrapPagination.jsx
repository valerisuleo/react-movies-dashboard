import React from "react";
import _ from "lodash";

const BootstrapPagination = (props) => {
    const { itemsCount, pageSize, onBtnClick, currentPage } = props;
    const pagesCount = itemsCount / pageSize;
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map((page, index) => (
                    <li
                        onClick={() => (pages.length > 1 ? onBtnClick(page) : null)}
                        className={page === currentPage ? "page-item active" : "page-item"}
                        key={index}
                    >
                        <a className="page-link" href="#">
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default BootstrapPagination;
