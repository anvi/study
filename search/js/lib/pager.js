(function (util) {

    util.ITEM_COUNT_PER_PAGE = 10;

    util.range = function (start, end) {
        var rng = [];

        if (!end) {
            end = start;
            start = 0;
        }

        for (var i = start; i < end; i++)
            rng.push(i);

        return rng;
    };

    util.Pager = function (data) {
        var self = this,
            itemCountPerPage = util.ITEM_COUNT_PER_PAGE;

        self.current = 0;

        self.content = function (index) {
            if (index > self.pageCount - 1) {
                index = self.pageCount - 1;
            } else if (index < 0) {
                index = 0;
            }

            if (index != self.current) {
                self.current = index;
            }
            
            var start = index * self.itemCountPerPage,
                end = (index * self.itemCountPerPage + self.itemCountPerPage) > data.length
                    ? data.length
                    : (index * self.itemCountPerPage + self.itemCountPerPage);

            return data.slice(start, end);
        };

        self.next = function () {
            if (!self.canPage('next')) return;
            self.current++;
        };

        self.prev = function () {
            if (!self.canPage('prev')) return;
            self.current--;
        };

        self.first = function () {
            self.current = 0;
        };

        self.last = function () {
            self.current = self.pageCount - 1;
        };

        self.canPage = function (dir) {
            if (dir === 'next') return self.current < self.pageCount - 1;
            if (dir === 'prev') return self.current > 0;
            return false;
        };

        self.list = function () {
            var start, end;
            start = self.current < 5 ? 0 : self.current - 5;
            end = self.pageCount - self.current < 5
                ? self.pageCount
                : self.current + 5;
            return Util.range(start, end);
        };

        Object.defineProperty(self, 'itemCountPerPage', {
            configurable: false,
            enumerable: false,
            get: function () { return itemCountPerPage; },
            set: function (val) {
                itemCountPerPage = parseInt(val) || itemCountPerPage;
            }
        });

        Object.defineProperty(self, 'pageCount', {
            configurable: false,
            enumerable: false,
            get: function () {
                return Math.ceil(data.length / self.itemCountPerPage);
            }
        });
    };

})(window.Util = window.Util || {});