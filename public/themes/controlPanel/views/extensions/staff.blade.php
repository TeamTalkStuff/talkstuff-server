<router-link tag="li" :to="{name : 'staffs'}" class="bg-hover-darkGray">
    <a href="#" class="fg-white">
        <i class="uk-margin-small-right fa fa-user fa-2x uk-text-middle"></i>
        Staffs
    </a>
</router-link>

@section('scripts')
    <script src="/themes/controlPanel/views/staffs/staffs.js"></script>
    @parent
@endsection