import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';

function MovieSearch({ search, setSearch }) {
  return (
    <Search>
      <Input
        type='search'
        placeholder='영화명 검색'
        onChange={e => {
          // console.log(e.target.value);
          setSearch(e.target.value);
        }}
      />
      <Button type='button'>
        <CgSearch className='icon' />
      </Button>
    </Search>
  );
}

const Search = styled.div`
  display: flex;
  flex-direction: row;

  width: 230px;
  height: 36px;
  margin: 0;
  /* padding: 0 31px 0 0; */
  align-items: center;

  border: 1px solid #d8d9db;
  border-radius: 3px;
`;

const Input = styled.input`
  width: 100%;
  height: 34px;
  padding-left: 10px;

  background-color: transparent;
  border: 0;
  outline: none;
  caret-color: #fff;
  /* color: #fff; */
`;

const Button = styled.button`
  width: 30px;
  height: 32px;

  border: none;
  background-color: transparent;
  /* url(https://img.megabox.co.kr/static/pc/images/common/btn/btn-search-input.png)
    no-repeat center; */

  .icon {
    vertical-align: middle;
    background-color: transparent;
    text-align: center;
    font-size: 18px;
    color: gray;
  }

  &:hover {
    cursor: pointer;
  }
`;
export default MovieSearch;