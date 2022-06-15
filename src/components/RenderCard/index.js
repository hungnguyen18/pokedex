import { memo } from 'react';

import Card from '../Card';

function RenderCard({ isInputSearch, listSearch, listPokedex, onSetDetail }) {
    const listCard = isInputSearch ? listSearch : listPokedex;

    return (
        <>
            {listCard.map((data, i) => {
                const id = data.url.slice(34).replace('/', '');

                return (
                    <Card
                        onClick={() => onSetDetail(id)}
                        key={i}
                        data={data}
                        id={id}
                    />
                );
            })}
        </>
    );
}

export default memo(RenderCard);
