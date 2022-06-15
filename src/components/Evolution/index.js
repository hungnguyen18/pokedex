import React, { memo } from 'react';
import classNames from 'classnames/bind';

import styles from './Evolution.module.scss';

const cx = classNames.bind(styles);

function Evolution({ id, onSetDetail, chainEvolution, img }) {
    //Set id img evolution chain
    const idChainImg1 =
        id > 0
            ? chainEvolution.species?.url?.slice(42)?.replace('/', '')
            : null;
    const idChainImg2 =
        id > 0
            ? chainEvolution.evolves_to
                  ?.map((item) =>
                      item.species?.url?.slice(42)?.replace('/', '')
                  )
                  .toString()
            : null;
    const idChainImg3 =
        id > 0
            ? chainEvolution.evolves_to
                  ?.map((item) =>
                      item.evolves_to?.map((item) =>
                          item.species?.url?.slice(42).replace('/', '')
                      )
                  )
                  .toString()
            : null;

    return (
        <>
            <h3>Evolution</h3>
            <div className={cx('detail-chain')}>
                {idChainImg1 > 0 && (
                    <div>
                        <img
                            src={img(idChainImg1)}
                            alt="Evolution Chain"
                            onClick={() => onSetDetail(idChainImg1)}
                        />
                    </div>
                )}

                {chainEvolution.evolves_to.slice(0, 1).map((item) => {
                    return item.evolution_details.slice(0, 1).map((item, i) => (
                        <div key={i} className={cx('detail-properties')}>
                            {item.min_level || '?'}
                        </div>
                    ));
                })}

                {idChainImg2 > 0 && (
                    <img
                        src={img(idChainImg2)}
                        alt="Evolution Chain"
                        onClick={() => onSetDetail(idChainImg2)}
                    />
                )}

                {chainEvolution.evolves_to.map((item) =>
                    item.evolves_to.slice(0, 1).map((item) =>
                        item.evolution_details.slice(0, 1).map((item, i) => (
                            <div key={i} className={cx('detail-properties')}>
                                {item.min_level || '?'}
                            </div>
                        ))
                    )
                )}

                {idChainImg3 > 0 && (
                    <img
                        src={img(idChainImg3)}
                        alt="Evolution Chain"
                        onClick={() => onSetDetail(idChainImg3)}
                    />
                )}
            </div>
        </>
    );
}

export default memo(Evolution);
